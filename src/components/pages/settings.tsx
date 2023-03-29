import React, { useState } from "react";
import { Box, Table, Button, H1 } from '@adminjs/design-system';
import StorageSettings from "../settings/storage";

const settingsPage: React.FC = () => {
    const [key, setKey] = useState<string>('home');
    return (
        <Box p="xxl">
            <H1>
                Settings
            </H1>
            <StorageSettings />
        </Box>
      );
}

export default settingsPage