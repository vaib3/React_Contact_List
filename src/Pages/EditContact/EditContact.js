// Importing dependienceies from the react-router-dom
import { useNavigate, useParams } from 'react-router-dom';
// Imprting the Values for the ContactApi
import { useValue } from '../../context';
// Importing some dependencies react-router-dom
import { Link } from 'react-router-dom';
// Importing some of the Styling
import Style from './EditContact.module.css';

// imporring Toast for notification
import {toast} from 'react-toastify';

function Edit() {
    // Importing Values from the contact API
    const { contactList, setContactList, nameRef, emailRef, numberRef, handleClear } = useValue();
    // using to navigate to the home page, after submit is happend
    const navigate = useNavigate();
    // taking the id form the params
    const param = useParams();
    // finding the currenctContact, with the id passed in the params
    const currentContact = contactList.find(contact => contact.id === parseInt(param.id));
    // funciton to handle, when the submit button is clicked
    const handleSubmit = (e) => {
        e.preventDefault();
        // assigning the value to the name
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = numberRef.current.value;
        // return the default value
        if (name === currentContact.name && email === currentContact.email && phone === currentContact.phone) {
            return toast.error('Please changes the values !');
        }
        // making new array so that we can make the changes
        const updatedContact = {
            ...currentContact,
            name,
            email,
            phone
        };
        // Updating the list
        const updatedList = contactList.map(contact => {
            if (contact.id === currentContact.id) {
                return updatedContact;
            }
            return contact;
        });
        toast.success("Contact Updated !");
        // Navagating to the home page, after the task is done
        navigate('/');
        // Setting the contact list
        setContactList(updatedList);

        handleClear();
    }
    // REturing the UI of the page
    return (
        <>
            <div className={Style.container}>
                <h1>Edit Contact</h1>
                {/* this is the form in which all the action will be performing */}
                <form onSubmit={handleSubmit}>
                    {/* if currentContact is presnet then the value will be assinged as the default value */}
                    <input type="text" defaultValue={currentContact?.name} placeholder="Name" ref={nameRef} /> <br />
                    <input type="email" defaultValue={currentContact?.email} placeholder="Email" ref={emailRef} /> <br />
                    <input type="tel" defaultValue={currentContact?.phone} placeholder="Number" ref={numberRef} /> <br />
                    <div className={Style.buttonDiv}>
                        <button type='submit' className={Style.updateButton}>Update Contact</button>
                        <Link to='/'>
                            <button className={Style.cancle}>Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Edit;