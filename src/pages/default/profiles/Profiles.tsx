import React, { useEffect, useState } from "react";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { Tappable } from "@/pages/default/Tappable";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/Button";
import { FlexLayouts } from "@/theme/layouts";
import { formatDID } from "@/util/formatters";
import { TabNavigatorProps } from "@/types/navigation";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import {
  Profile,
  profileProtocol,
} from "@/features/dwn/profile-protocol/profile-protocol";
import type { ManagedIdentity } from "@web5/agent";

type Row = {
  identity: ManagedIdentity;
  profile: Profile;
};

type Props = TabNavigatorProps<"ProfilesScreen">;

const ProfilesScreen = ({ navigation }: Props) => {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const fetchRows = async () => {
      const managedIdentities = await IdentityAgentManager.listIdentities();
      const unfilteredRows = await Promise.all(
        managedIdentities.map(async (identity): Promise<Row | undefined> => {
          const web5 = IdentityAgentManager.web5(identity);

          const queryResult = await web5.dwn.records.query({
            message: {
              filter: {
                protocol: profileProtocol.protocol,
                protocolPath: "profile",
              },
            },
          });

          // The Records returned with a query result DO NOT have access
          // to the data. Get the recordId we're interested in and
          // make an explicit read request to acquire a Record that DOES
          // have access to the data.
          const recordId = queryResult.records?.at(0)?.id;
          if (!recordId) {
            return undefined;
          }

          const readResult = await web5.dwn.records.read({
            message: {
              recordId,
            },
          });

          if (!readResult) {
            return undefined;
          }

          const profile = (await readResult.record.data.json()) as Profile;

          return {
            identity,
            profile,
          };
        })
      );

      const rows = unfilteredRows.filter((row) => row !== undefined) as Row[];
      setRows(rows);
    };

    void fetchRows();
  }, []);

  const navigateToAddProfile = () => {
    navigation.navigate("AddProfileScreen");
  };

  return (
    <ParentPageLayout>
      <View style={FlexLayouts.containerButtonBottom}>
        <ScrollView>
          {rows.map((row) => (
            <Tappable
              key={row.identity.did}
              iconName="hash"
              heading={row.identity.name}
              subtitle={row.profile.displayName}
              body={formatDID(row.identity.did)}
              onPress={() => console.log("tapped", row.identity.name)}
            />
          ))}
        </ScrollView>
        <Button
          kind="primary"
          onPress={navigateToAddProfile}
          text="Create a new profile"
        />
      </View>
    </ParentPageLayout>
  );
};

export default ProfilesScreen;
