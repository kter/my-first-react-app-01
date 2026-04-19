export function updateForm(form) {
  return new Promise(resolve => {
    setTimeout(() => {
      const errors = [];
      if (form.title === '') { errors.push('name required'); }
      if (form.price < 0) { errors.push('price must be 0 over'); }
      if (form.published === '') { errors.push('publish date required'); }

      if (errors.length > 0) {
        resolve({ errors });
      } else {
        resolve({ result: form, errors: null });
      }
    }, 1000);
  });
}


