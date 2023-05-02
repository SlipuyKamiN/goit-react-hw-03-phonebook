import PropTypes from 'prop-types';
import {
  ContactsList,
  ConctactListItem,
  DeleteButton,
} from './ContactList.styled';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <>
      <ContactsList>
        {contacts.map(contact => (
          <ConctactListItem key={contact.id}>
            {contact.name}: {contact.number}
            <DeleteButton
              type="button"
              onClick={() => {
                deleteContact(contact.id);
              }}
            >
              Delete
            </DeleteButton>
          </ConctactListItem>
        ))}
      </ContactsList>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
