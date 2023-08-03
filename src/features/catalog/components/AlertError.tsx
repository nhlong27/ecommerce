import React from 'react';
import { AlertCircle, FileWarning, Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AlertError = ({ error }: { error: any }) => {
  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{error.name ?? Error}</AlertTitle>
      <AlertDescription>
        {error.message ?? 'Your session has expired. Please log in again.'}
      </AlertDescription>
    </Alert>
  );
};

export default AlertError;
