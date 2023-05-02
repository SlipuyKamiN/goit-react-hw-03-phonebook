import PropTypes from 'prop-types';
import {
  AppForm,
  FormInput,
  FormInputLabel,
  SubmitButton,
  ErrMessage,
} from './Form.styled';
import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import * as yup from 'yup';

export const ContactForm = ({ onSubmit }) => {
  const nameID = nanoid();
  const numberID = nanoid();

  const initialValues = {
    name: '',
    number: '',
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(
        "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required(),
    number: yup
      .string()
      .matches(
        '^[+]?[(]?[0-9]{1,4}[)]?[-s.]?[0-9]{1,4}[-s.]?[0-9]{1,6}$',
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required(),
  });

  const handleSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <AppForm autoComplete="off">
        <FormInputLabel htmlFor={nameID}>Name</FormInputLabel>
        <FormInput type="text" name="name" id={nameID} />
        <ErrMessage name="name" component="div" />

        <FormInputLabel htmlFor={numberID}>Number</FormInputLabel>
        <FormInput type="text" name="number" id={numberID} />
        <ErrMessage name="number" component="div" />

        <SubmitButton type="submit">Submit</SubmitButton>
      </AppForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
