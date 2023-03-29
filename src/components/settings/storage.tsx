import React, { useState } from 'react';
import { Box, Button, FormGroup, Label, Input, Text, Select, CheckBox } from '@adminjs/design-system';

enum servicesEnum {
    pClound = "pClound",
    S3 = "AWS S3",
    GoogleDrive = "Google drive",
    sync  = "Sync"
}

const StorageSettings: React.FC = () => {
  const [service, setService] = useState<servicesEnum | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickSave = async () => {
    setIsLoading(true);
  };

  const servicesList = Object.entries(servicesEnum).map(([value, label]) => ({ value, label }));
  return (
    <Box p="xxl">
      <Text variant="title">Storages</Text>
      <FormGroup mt="xl">
        <Label>Service</Label>
        <Select 
          onChange={setService}
          isClearable 
          value={ service }
          options={ servicesList }
        />
      </FormGroup>
      <Button mt="xl" onClick={handleClickSave}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </Box>
  );
};

export default StorageSettings;
