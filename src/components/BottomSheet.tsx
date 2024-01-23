import React, { type ForwardedRef, forwardRef, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";

type Props = { children: React.ReactNode };
type Ref = ForwardedRef<BottomSheetModal>;
export const BottomSheet = forwardRef(({ children }: Props, ref: Ref) => {
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(["CONTENT_HEIGHT"]);

  const { bottom: bottomSafeArea } = useSafeAreaInsets();
  const bottomSheetContainerStyle = useMemo(
    () => ({
      ...styles.bottomSheetContainer,
      ...{ paddingBottom: bottomSafeArea },
    }),
    [bottomSafeArea]
  );

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose={true}
      handleComponent={BottomSheetKnob}
      backdropComponent={BottomSheetBackdropCustom}
      style={styles.bottomSheet}
      snapPoints={animatedSnapPoints as any}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
    >
      <BottomSheetView
        onLayout={handleContentLayout}
        style={bottomSheetContainerStyle}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

BottomSheet.displayName = "BottomSheet";

const BottomSheetKnob = () => {
  return (
    <View style={styles.bottomSheetKnobHeader}>
      <View style={styles.bottomSheetKnobBody} />
    </View>
  );
};

const BottomSheetBackdropCustom = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    enableTouchThrough={false}
    pressBehavior="none"
  />
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: "#FFF",
  },
  bottomSheetKnobHeader: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  bottomSheetKnobBody: {
    position: "absolute",
    width: 50,
    height: 4,
    backgroundColor: "#999",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  bottomSheet: {
    paddingBottom: 35,
    paddingHorizontal: 5,
  },
});
