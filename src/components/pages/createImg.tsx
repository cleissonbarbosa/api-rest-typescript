import React, { useState } from 'react';
import { Box, Button, FormGroup, Label, Input, Text, Select } from '@adminjs/design-system';
import axios from 'axios';

const CustomPage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [size, setSize] = useState<any>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    axios.post('/ia/create-img', { prompt, size: size.value }, {
      method: 'POST',
      headers: { 
        'Accept': 'application/json, text/plain, */*', 
        'Content-Type': 'application/json' 
      },
    }).then(response => {
      if (response.status != 201) {
        console.log(response)
        throw new Error('Failed to create image');
      }
      return response.data;
    }).then(data => {
      setResult(data.result);
    }).catch(error => {
      console.error(error);
      setResult('Error: ' + error.message);
    }).finally(() => setIsLoading(false))
  };

  return (
    <Box p="xxl">
      <Text variant="title">Create Image</Text>
      <FormGroup mt="xxl">
        <Label required>Prompt</Label>
        <Input onChange={(event) => setPrompt(event.target.value)} />
      </FormGroup>
      <FormGroup mt="xl">
        <Label>Size (optional)</Label>
        <Select 
          onChange={setSize}
          isClearable 
          value={size}
          options={[
            { value: '1024x1024', label: 'Grande' },
            { value: '256x256', label: 'Pequena' },
            { value: '512x512', label: 'Media' }
          ]}
        />
      </FormGroup>
      <Button mt="xl" onClick={handleClick}>
        {isLoading ? 'Loading...' : 'Create Image'}
      </Button>
      {result && !result.toLowerCase().includes('error') && !isLoading && (
        <Box p="xxl">
          <Text variant="title">Generated Image</Text>
          <img src={result} alt="Generated Image" />
        </Box>
      )}
      {result && result.toLowerCase().includes('error') && !isLoading && (
        <Box p="xxl">
          <Text variant="title">{result}</Text>
        </Box>
      )}
    </Box>
  );
};

export default CustomPage;
