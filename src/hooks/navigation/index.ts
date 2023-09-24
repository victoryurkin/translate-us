import { useNavigation as useNavigationHook } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@translate-us/constants';

export const useNavigation = () => {
  const { navigate, goBack } =
    useNavigationHook<NativeStackNavigationProp<RootStackParamList>>();

  return {
    navigate,
    goBack,
  };
};
