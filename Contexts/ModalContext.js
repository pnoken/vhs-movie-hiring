import { createContext } from 'react';

let initials = {
	show: false,
	setShow: '',
	close: '',
};
const ModalContext = createContext(initials);

export default ModalContext;
