import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'; 
import  { addContact } from 'redux/contacts/contacts-operations';
import s from './RegLogInputs.module.css';
import { getContactsItems } from 'redux/contacts/contacts-selectors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function InputsForm() { 
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contArr = useSelector(getContactsItems);

  const dispatch = useDispatch();

  const contactToServer = ({name, number}) => dispatch(addContact({name, number}));  

  const handleInputChange = e => {
    switch (e.currentTarget.name) {
      case 'subscriber':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        break;
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (contArr.findIndex(item => item.name === name) !== -1) {
      return toast.warn(`Абонент с именем ${name} уже существует!`);
    };
    if (contArr.findIndex(item => item.number === number) !== -1) {
      return toast.warn(`Такой номер ${number} уже присвоен другому абоненту!`);
    };
    contactToServer({name, number});
    setName('');
    setNumber('');
  };

  return (
      <div className={s.frame}>
      <form
        onSubmit={handleSubmit}
        className={s.form}
        autoComplete="on">
            <label >
              <input
                className={s.input}
                type="text"
                name="subscriber"
                placeholder="name"
                value={name}
                onChange={handleInputChange}  
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                required
              />
            </label>

            <label>
                <input
                className={s.input}
                type="tel"
                name="number"
                placeholder="phone"
                value={number}
                onChange={handleInputChange} 
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                required
              />
            </label> 
          <button type="submit" className={s.btn}>add contact</button> 
      </form>
      <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </div>
    )
  };

InputsForm.propTypes = {
  subscriber: PropTypes.string,
  number: PropTypes.string,
};
