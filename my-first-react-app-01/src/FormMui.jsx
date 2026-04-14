import './FormBasic.css'
import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

export default function FormMui() {
  const defaultValues = {
    name: 'user01',
    email: 'user01@example.com',
    gender: 'male',
    memo: ''
  };

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange'
  });

  const onsubmit = data => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
        console.log(data);
      }, 4000);
    });
  };
  const onerror = err => console.log(err);

  return (
    <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate>
      <div>
        <TextField label="name" margin="normal" {
          ...register('name', {
            required: 'Name must be exists',
            maxLength: {
              value: 20,
              message: 'Name must be less than 20 characters'
            }
           })}
           error={'name' in errors}
           helperText={errors.name?.message} />
      </div>
      <div>
        <FormControl>
          <FormLabel component="legend">Gender:</FormLabel>
          <Controller name="gender" control={control}
            rules={{
              required: 'Gender is required'
            }}
            render={({ field }) => (
              <>
                <RadioGroup {...field}>
                  <FormControlLabel value="male" control={<Radio />} label="male" />
                  <FormControlLabel value="female" control={<Radio />} label="female" />
                </RadioGroup>
                <FormHelperText error={'gender' in errors}>
                  {errors.gender?.message}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
      </div>
      <div>
        <TextField type="email" label="email" margin="normal"
              {...register('email', {
                required: 'email required',
                pattern: {
                  value: /^[a-z\-\d._%+]+@[a-z\-\d]+(?:\.[a-z\-\d]+)*\.[a-z]{2,}$/i,
                  message: 'malformed syntax of mail address',
                }
          })}
              error={'email' in errors}
              helperText={errors.email?.message} />
      </div>
      <div>
        <TextField label="Memo" margin="normal" multiline
          {...register('memo', {
            required: 'Memo must be not empty',
            minLength: {
              value: 10,
              message: 'Memo must be at least 10 characters'
            },
          })}
          error={'memo' in errors}
          helperText={errors.memo?.message} />
      </div>
      <div>
        <Button variant="contained" type="submit">Submit</Button>
      </div>
    </form>
  );
}
