import { useForm } from 'react-hook-form';
import './FormBasic.css'

export default function FormBasic() {
  const defaultValues = {
    name: 'user01',
    email: 'user01@example.com',
    gender: 'male',
    memo: ''
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  const onsubmit = data => console.log(data);
  const onerror = err => console.log(err);

  return (
    <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate>
      <div>
        <label htmlFor="name">Name: </label><br />
        <input id="name" type="text" {...register('name', {
          required: 'Name must be exists',
          maxLength: {
            value: 20,
            message: 'Name must be less than 20 characters'
          }
        })} />
        <div className="error">{errors.name?.message}</div>
      </div>
      <div>
        <label>Gender: </label><br />
        <label>
          <input id="male" type="radio" value="male"
            {...register('gender', {
              required: 'Gender is required',
            })} />Male
        </label>
        <label>
          <input id="female" type="radio" value="female" {...register('gender', {
            required: 'Gender is required',
          })} />Female
        </label>
        <div className="error">{errors.gender?.message}</div>
      </div>
      <div>
        <label htmlFor="email">Mail Address:</label><br />
        <input id="email" type="email"
          {...register('email', {
            required: 'mail address required',
            pattern: {
              value: /^[a-z\-\d._%+]+@[a-z\-\d]+(?:\.[a-z\-\d]+)*\.[a-z]{2,}$/i,
              message: 'malformed syntax of mail address',
            }
          })} />
        <div className="error">{errors.email?.message}</div>
      </div>
      <div>
        <label htmlFor="memo">Memo:</label><br />
        <textarea id="memo"
          {...register('memo', {
            required: 'Memo must be not empty',
            minLength: {
              value: 10,
              message: 'Memo must be at least 10 characters'
            }
          })} />
        <div className="error">{errors.memo?.message}</div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
