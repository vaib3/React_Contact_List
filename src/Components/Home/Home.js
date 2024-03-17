// importing a component whih will show when there is delay in action
import Loader from "../Loader/Loader";
// importing all the values from contactAPI
import { useValue } from "../../context";
// Importing Style
import Style from './Home.module.css';
// Importing some dependiences from the react-router-dom
import { Link } from "react-router-dom";


// Home function
function Home() {
    // Importing all the dependencies from the ContactAPI(stateManagementLibrary)
    const {contactList, isLoading , deleteContact} = useValue();

    if(isLoading){
        return <Loader />
    }
    // UI for the Home Page, in which all the contact is showing
    return (
        <>
            {/* All the UI for the Home Page */}
            <div className={Style.addContact}>
                {/* Button which will allow to Add the contact */}
                <Link to = 'add-contact'>
                    <button>Add To Contact</button>
                </Link>
            </div>
            {/* UI for the contactTable */}
            <div className={Style.contactTable}>
                <table className="table">
                    <thead>
                        {/* Table */}
                        <tr className={Style.tableHead}>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {contactList.map((contact, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <Link to= {`edit-contact/${contact.id}`}>
                                        <button className={Style.editButton}>Edit</button>
                                    </Link>
                                    
                                    <button onClick={()=>deleteContact(contact.id)} className={Style.deleteButton}>
                                        Delete
                                    </button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    ) 
}

export default Home;