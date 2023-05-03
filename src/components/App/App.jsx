import { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  PhonebookWrapper,
  PhonebookTitle,
  PhonebookSubTitle,
} from './App.styled';
import { ContactForm } from 'components/Form/Form';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const savedContacts = JSON.parse(localStorage.getItem('contacts'));

      if (savedContacts && savedContacts.length > 0) {
        this.setState({
          contacts: savedContacts,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const previousContacts = prevState.contacts;
    const updatedContacts = this.state.contacts;

    if (updatedContacts.length !== previousContacts.length) {
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
  }

  handleFormSubmit = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    const isNameAlreadyInContacts = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (isNameAlreadyInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [{ id: nanoid(), name, number }, ...prevState.contacts],
      };
    });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  deleteContact = idToDelete => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== idToDelete
        ),
      };
    });
  };

  render() {
    const { filter } = this.state;

    return (
      <PhonebookWrapper>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactForm onSubmit={this.handleFormSubmit} />
        <PhonebookSubTitle>Contacts</PhonebookSubTitle>
        <Filter
          filterValue={filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={this.filterContacts()}
          deleteContact={this.deleteContact}
        />
      </PhonebookWrapper>
    );
  }
}
