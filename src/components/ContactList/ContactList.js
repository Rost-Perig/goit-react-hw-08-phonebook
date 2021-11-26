import { useEffect } from 'react'; 
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getContactsItems, getContactsFilter, getLoadingSpinner } from 'redux/contacts/contacts-selectors';
import {fetchContacts} from 'redux/contacts/contacts-operations';
import s from './ContactList.module.css'
import ContactData from '../ContactData';
import FindForm from '../FindForm';
import Spinner from '../Spinner';

const ContactList = () => {
    const dispatch = useDispatch();  

    // const contactArr = useSelector(state => state.contacts.items);
    // const findValue = useSelector(state => state.contacts.filter);
    // const isLoadingContacts = useSelector(state => state.contacts.loadingSpinner);

    const contactArr = useSelector(getContactsItems);  
    const findValue = useSelector(getContactsFilter);  
    const isLoadingContacts = useSelector(getLoadingSpinner);
    
    useEffect(() => { dispatch(fetchContacts()) }, [dispatch]);

     return (
        <div>

            <FindForm/>
                
            {contactArr && (<ul className={s.list}>
                 {[...contactArr].sort((a, b) => a.name.localeCompare(b.name)).filter(item => item.name.toLowerCase().includes(findValue.toLowerCase())).map(item => {
                    const { id } = item;
                    return (
                        <li key={id} className={s.listItem}>
                            < ContactData contactObj={item} />
                        </li>
                    );
                })}
             </ul>)}
             
            {isLoadingContacts && <Spinner/>}
                
        </div>
    );
};

ContactList.propTypes = {
  id: PropTypes.string,
};

export default ContactList;