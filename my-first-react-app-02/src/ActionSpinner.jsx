import { useFormStatus } from 'react-dom';
import loading from 'image/loading.gif';

export default function ActionSpinner() {
  const { pending, data } = useFormStatus();
  return (
    <>
      <p hidden={!pending}>
        <img src={loading} />
      </p>
    </>
  );
}


