import React, { useState } from 'react';
import { Box, Button, FormGroup, Label, Input, Text, Select, Modal, H1, TextArea } from '@adminjs/design-system';
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
      <H1>Create Image</H1>
      <Text variant="sm">Using OpenAi Integration, model: DALL·E 2</Text>
      <FormGroup mt="xxl">
        <Label required>Prompt</Label>
        <TextArea width={1/1} onChange={(event) => setPrompt(event.target.value)} placeholder="Universo no olho de uma criança, estilo desenho a lápis colorido" />
      </FormGroup>
      <FormGroup mt="xl">
        <Label>Size (optional)</Label>
        <Select 
          onChange={setSize}
          placeholder="Selecione o tamanho da imagem que será gerada"
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
          <Modal 
            title='Generated Image' 
            icon='WatsonHealthStatusResolved'
            onClose={() => setResult('')}
            onOverlayClick={() => setResult('')}
            label='Success'
            variant='success'
            subTitle='Clique com o botão direito e abra a imagem em uma nova guia para fazer o download'
            >
              <img style={{maxWidth: "450px", maxHeight: "400px"}} src={result} alt="Generated Image" />
              
          </Modal>
        </Box>
      )}
      {result && result.toLowerCase().includes('error') && !isLoading && (
        <Box p="xxl">
          <Modal 
            title='Generated Image Error' 
            icon='Misuse'
            onClose={() => setResult('')}
            onOverlayClick={() => setResult('')}
            label='Error'
            variant='danger'
            >
            <Text variant="title">{result}</Text>
          </Modal>
        </Box>
      )}
    </Box>
  );
};

export default CustomPage;
