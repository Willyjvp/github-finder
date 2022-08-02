import { useContext } from 'react';
import { motion } from 'framer-motion';
import AlertContext from '../context/alert/AlertContext';
import { BiErrorCircle } from 'react-icons/bi';

const Alert = () => {
  const { alert } = useContext(AlertContext);

  return (
    <motion.div
      animate={{ opacity: alert ? 1 : 0 }}
      className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-4'
      style={{ visibility: alert ? 'visible' : 'hidden' }}
    >
      <div className='alert alert-error'>
        <div className='text-white'>
          <BiErrorCircle size={30} />
          <span>{alert?.msg} !!</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;
