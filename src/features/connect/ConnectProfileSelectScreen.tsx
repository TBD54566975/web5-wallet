import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Typography } from "@/theme/typography";
import { SPACE } from "@/theme/layouts";
import { Avatar } from "@/components/Avatar";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import Loader from "@/components/Loader";
import { useIdentityList } from "@/features/identity/hooks";
import { useProfiles } from "@/features/profile/hooks";
import { ConnectSuite } from "@/features/connect/connect-suite";
import { type AppNavigatorProps } from "@/types/navigation";
import { type Profile } from "@/types/models";

type Props = AppNavigatorProps<"ConnectProfileSelectScreen">;
const ConnectProfileSelectScreen = ({ route }: Props) => {
  const [checkList, setCheckList] = useState<CheckList>([]);

  // TODO: these queries need more abstraction
  const { data: allIdentities, isLoading: isLoadingIdentities } =
    useIdentityList();

  const profileQueries = useProfiles(allIdentities ?? [], {
    enabled: allIdentities !== undefined,
  });
  const isLoadingProfiles = profileQueries.some((result) => result.isLoading);

  // create a derived state `checkList` with a `checked` property on each profile
  // TODO: abstract this out of the view
  type CheckList = (Profile & { checked: boolean })[];
  const deriveChecklistState = () => {
    if (!isLoadingProfiles) {
      const identitiesWithCheckmarks = profileQueries.flatMap(
        ({ data: profile }) => {
          if (profile) {
            return [{ ...profile, checked: false }];
          } else {
            return [];
          }
        }
      );
      setCheckList(identitiesWithCheckmarks);
    }
  };

  // TODO: abstract to React Query
  useEffect(() => {
    if (!isLoadingProfiles && !isLoadingIdentities) {
      const { connectNonce, temporaryDid, serverURL } = route.params;
      void ConnectSuite.initConnect(temporaryDid, connectNonce, serverURL);
      deriveChecklistState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingProfiles, isLoadingIdentities]);

  if (isLoadingIdentities || isLoadingProfiles) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={Typography.heading3}>
              Choose the profiles you’d like to connect to Dwitter
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={Typography.paragraph2}>
              Youll be able to use the profiles you select below in Dwitter.
            </Text>
            <>
              {checkList.map((profile, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setCheckList((current) => {
                        current[index].checked = !current[index].checked;

                        // immutably set the current state
                        return [...current];
                      });
                    }}
                  >
                    <View key={index} style={styles.profilesListItem}>
                      {/* there is currently no concept of a web5 profile having an icon */}
                      {/* https://github.com/TBD54566975/web5-wallet/issues/145 */}
                      <Avatar iconName={"person"} />
                      <View>
                        <Text style={Typography.heading5}>
                          {profile.displayName}
                        </Text>
                        <Text>{profile.name}</Text>
                      </View>
                      <Checkbox
                        checked={profile.checked}
                        style={styles.checkbox}
                      />
                    </View>
                  </Pressable>
                );
              })}
            </>
          </View>
          <View style={styles.footer}>
            <Button kind="primary" onPress={() => {}} text="Next" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  scrollview: { flexGrow: 1 },
  profilesListItem: {
    flexDirection: "row",
    gap: SPACE.BASE,
    alignItems: "center",
  },
  container: {
    padding: SPACE.MEDIUM,
    flex: 1,
    gap: SPACE.BASE,
  },
  header: {},
  body: { flex: 1, gap: SPACE.LARGE },
  checkbox: { marginLeft: "auto" },
  footer: { marginTop: "auto" },
});

export default ConnectProfileSelectScreen;
