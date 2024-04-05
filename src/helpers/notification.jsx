import { showNotification } from '@mantine/notifications';
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons';

export const successNotification = ({
  title = 'Başarılı',
  message = 'İşleminiz başarıyla tamamlandı!',
  icon = <IconCheck />,
  color = 'green'
}) => {
  showNotification({
    autoClose: 2500,
    title,
    message,
    icon,
    color
  });
};

export const errorNotification = ({
  title = 'Başarısız',
  message = 'İşlem sırasında bir hatayla karşılaşıldı!',
  icon = <IconX />,
  color = 'red'
}) => {
  showNotification({
    autoClose: 2500,
    title,
    message,
    icon,
    color
  });
};

export const warningNotification = ({
  title = 'Uyarı',
  message = 'İşlem sırasında bir hatayla karşılaşıldı!',
  icon = <IconAlertCircle />,
  color = 'yellow'
}) => {
  showNotification({
    autoClose: 2500,
    title,
    message,
    icon,
    color
  });
};


