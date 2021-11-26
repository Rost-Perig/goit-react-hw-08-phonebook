import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';   
import {search} from 'redux/contacts/contacts-actions';
import s from './FindForm.module.css';


const FindForm = () => {     
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();  

    const findValue = value => dispatch(search(value));

    const findInputChange = e => {
        setInputValue(e.currentTarget.value);
        findValue(e.currentTarget.value);
    };

    // const reset = (e) => setInputValue('');

    return (
        <div className={s.frame}>
            <input
                className={s.input}
                type="text"
                name="find"
                value={inputValue}
                placeholder="find contacts by name"
                onChange={findInputChange}
                // onBlur={reset}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                required
            />
        </div>
    );

};

export default FindForm;

FindForm.propTypes = {
    inputValue: PropTypes.string
};