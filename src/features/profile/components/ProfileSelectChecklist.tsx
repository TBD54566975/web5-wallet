import React, { type Dispatch, type SetStateAction, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useProfilesQuery } from "../hooks";
import type { Profile } from "../../../types/models";
import { SPACE } from "../../../theme/layouts";
import { Avatar } from "../../../components/Avatar";
import { Checkbox } from "../../../components/Checkbox";
import { Typography } from "../../../theme/typography";
import { Loader } from "../../../components/Loader";

type Props = {
  checkList: CheckList;
  setCheckList: Dispatch<SetStateAction<CheckList>>;
  exclusive?: boolean;
};
export type CheckList = (Profile & { checked: boolean })[];
export const ProfileSelectChecklist = ({
  checkList,
  setCheckList,
  exclusive = false,
}: Props) => {
  const profileQueries = useProfilesQuery();
  const isLoading = profileQueries.some((result) => result.isLoading);

  const deriveChecklistState = () => {
    if (!isLoading) {
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
    if (!isLoading) {
      deriveChecklistState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {checkList.map((profile, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              setCheckList((current) => {
                const isChecked = current[index].checked;

                // set all to unchecked first
                if (exclusive) {
                  for (const item of current) {
                    item.checked = false;
                  }
                }

                current[index].checked = !isChecked;

                // immutably set the current state
                return [...current];
              });
            }}
          >
            <View key={index} style={styles.profilesListItem}>
              {/* TODO: there is currently no concept of a web5 profile having an icon */}
              {/* https://github.com/TBD54566975/web5-wallet/issues/145 */}
              <Avatar iconName={"person"} />
              <View>
                <Text style={Typography.heading5}>{profile.displayName}</Text>
                <Text>{profile.name}</Text>
              </View>
              <Checkbox checked={profile.checked} style={styles.checkbox} />
            </View>
          </Pressable>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  profilesListItem: {
    flexDirection: "row",
    gap: SPACE.BASE,
    alignItems: "center",
  },
  checkbox: { marginLeft: "auto" },
});
