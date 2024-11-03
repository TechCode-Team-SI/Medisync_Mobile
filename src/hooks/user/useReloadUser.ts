import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

const useReloadUser = (reloadUser: () => void) => {
  useFocusEffect(
    React.useCallback(() => {
      reloadUser();
    }, [reloadUser])
  );
};

export default useReloadUser;
