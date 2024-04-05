import { LoadingOverlay } from '@mantine/core';

function CustomLoadingOverlay({ visible }, props) {
  return <LoadingOverlay visible={visible} {...props} />;
}

export default CustomLoadingOverlay;
