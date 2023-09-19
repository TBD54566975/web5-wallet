import React, { useEffect, useState } from "react";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { Tappable } from "@/pages/default/Tappable";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/Button";
import { FlexLayouts } from "@/theme/layouts";
import { formatDID } from "@/util/formatters";
import { TabNavigatorProps } from "@/types/navigation";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { Profile } from "@/features/dwn/profile-protocol/profile-protocol";
import type { ManagedIdentity } from "@web5/agent";
import { fetchProfile } from "@/features/identity/fetch-profile";

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
          const profile = await fetchProfile(identity);
          if (!profile) {
            return undefined;
          }

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

  const navigateToProfile = (identity: ManagedIdentity) => {
    navigation.navigate("ProfileDetailScreen", { identity });
  };

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
              onPress={() => navigateToProfile(row.identity)}
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
