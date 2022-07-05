import { DeleteOutline, Launch, Remove } from '@mui/icons-material';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  FormGroup,
  FormInput,
  Grid,
  GridItem,
  H1,
  H2,
  P,
} from '@nox-engine/editor-ui';
import { useForm } from 'react-hook-form';
import { FileSystem } from '@nox-engine/editor-api-client';

export function Index() {
  const { control, handleSubmit } = useForm();

  return (
    <Grid $gap={'0'} $height={'100vh'} $gridTemplateColumns={['auto', '32rem']}>
      <GridItem>
        <Grid $width={'100%'} $height={'100%'}>
          <GridItem $backgroundColor={'grayDark'}>
            <Grid
              $gridTemplateColumns={['3rem', 'auto', '3rem']}
              $gridTemplateRows={['3rem', 'auto', '3rem']}
              $columnGap={'0'}
              $rowGap={'0'}
            >
              <GridItem $gridColumnStart={2} $gridRowStart={2}>
                <Grid $gridTemplateRows={['auto', '1rem']} $rowGap={'0'}>
                  <H2 $color={'white'}>Your projects</H2>
                </Grid>
                <Grid $gridTemplateColumns={['1fr', '1fr', '1fr']} $gridTemplateRows={['auto']}>
                  <Card>
                    <CardBody>
                      <CardTitle>Title</CardTitle>
                    </CardBody>
                    <CardFooter>
                      <Grid $gridTemplateColumns={['1fr', '1fr']} $columnGap={'m'}>
                        <Button $icon={<Launch />} $backgroundColor={'green'} $color={'white'}>
                          Open
                        </Button>
                        <Button $icon={<DeleteOutline />} $backgroundColor={'red'} $color={'white'}>
                          Remove
                        </Button>
                      </Grid>
                    </CardFooter>
                  </Card>
                </Grid>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <Grid
          $gridTemplateColumns={['3rem', 'auto', '3rem']}
          $rowGap={'0'}
          $columnGap={'0'}
          $gridTemplateRows={['3rem', 'auto', '3rem']}
        >
          <GridItem $gridColumnStart={2} $gridRowStart={2}>
            <Grid $gridTemplateRows={['auto', '1rem']} $rowGap={'0'}>
              <H2 $color={'grayDark'}>Create new project</H2>
              <Form
                $handleSubmit={handleSubmit}
                $onSubmit={async (data) => {
                  const projectDirectory = data.projectName.trim().toLowerCase().replace(new RegExp('\\W+', 'gm'), '-');
                  await FileSystem.mkdir([projectDirectory]);
                  await FileSystem.mkdir([projectDirectory, 'assets']);
                  await FileSystem.mkdir([projectDirectory, 'assets', 'scene']);
                  await FileSystem.mkdir([projectDirectory, 'library']);
                  await FileSystem.mkdir([projectDirectory, 'logs']);
                  await FileSystem.mkdir([projectDirectory, 'packages']);
                  await FileSystem.mkdir([projectDirectory, 'projectsSettings']);
                  await FileSystem.mkdir([projectDirectory, 'userSettings']);
                  await FileSystem.writeFile(
                    [projectDirectory, 'project.json'],
                    JSON.stringify({
                      projectName: data.projectName,
                      directory: projectDirectory,
                      created: new Date().toString(),
                    })
                  );
                }}
              >
                <FormGroup>
                  <label>Project name</label>
                  <FormInput $control={control} $name={'projectName'} />
                </FormGroup>
                <FormGroup>
                  <label>Web GL version</label>
                  <select>
                    <option>WebGL v1</option>
                    <option>WebGL v2</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <Button>Submit</Button>
                </FormGroup>
              </Form>
            </Grid>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}

export default Index;
