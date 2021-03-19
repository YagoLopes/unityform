import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Form } from '../../src/components';

const Provider: React.FC = ({ children }) => {
  const [values, setValues] = useState('');
  const onSubmit = (data: any) => {
    setValues(JSON.stringify(data));
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Form onSubmit={onSubmit}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={8}>
                    {children}
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                    >
                      Test submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography>
                You sent: <code> {values} </code>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Provider;
