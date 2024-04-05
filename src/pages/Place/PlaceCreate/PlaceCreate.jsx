import {
  Button,
  Grid,
  Group,
  Card,
  Title,
  TextInput
} from '@mantine/core';
import { useState } from 'react';
import { errorNotification, successNotification } from '@/helpers/notification';
import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay';
import PageTransitions from '@/components/PageTransitions';
import { createPlace } from '@/services/place';

const schema = Joi.object({
  name: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
});

const PlaceCreate = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      name: '',
      latitude: '',
      longitude: ''
    },
    validate: joiResolver(schema)
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const body = {
        name: values.name,
        coordinates: {
          type: 'Point',
          coordinates: [values.latitude, values.longitude]

        }
      }
      await createPlace(body);
      successNotification({});
    } catch (err) {
      errorNotification({});
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageTransitions>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Card shadow='sm' radius='1em' mt='lg' withBorder>
          <CustomLoadingOverlay visible={loading} />
          <Title order={3} mb='xl'>Place</Title>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                description='Name'
                {...form.getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                description='Latitude'
                {...form.getInputProps('latitude')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                description='Longitude'
                {...form.getInputProps('longitude')}
              />
            </Grid.Col>
          </Grid>
        </Card>
        <Group position='center' mb='lg'>
          <Button loading={loading} type='submit' mt='lg' style={{ width: '15em' }}>
            Save
          </Button>
        </Group>
      </form>
    </PageTransitions>
  )
}

export default PlaceCreate;
