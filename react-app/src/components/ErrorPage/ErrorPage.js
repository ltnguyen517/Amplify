import { useHistory } from 'react-router-dom';
import './Error.css';
import pic from './errorpic.png'

const Error404Page = () => {
    const history = useHistory();

    return (
        <div className='error-layout'>
            <img className='img-of-error' src={pic} alt='Error 404'></img>
            <div className='button-area'>
                <button className='back-home-button' onClick={() => {
                    history.push('/');
                }}>Return Home</button>
            </div>
        </div>
    );
};
export default Error404Page;
