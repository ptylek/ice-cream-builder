import classes from 'shared/styles.module.css';

const checkRules = (target, formValidationHelper, setFormValidationHelper) => {
	let isValid = true;

	if (target.required) {
		isValid = target.value.trim() !== '' && isValid;
	}

	if (target.minLength !== -1) {
		isValid = target.value.length >= target.minLength && isValid;
	}

	if (target.maxLength !== -1) {
		isValid = target.value.length <= target.maxLength && isValid;
	}
	
	if (target.type === 'email') {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(target.value) && isValid;
	}

	const invalidClass = 'error';
	const successClass = classes.success;
	const parent = target.parentElement;

	if (!isValid) {
		parent.classList.remove(successClass);

		if (!parent.classList.contains(invalidClass)) {
			parent.classList.add(invalidClass);
		}
	} else {
		if (parent.classList.contains(invalidClass)) {
			parent.classList.remove(invalidClass);
		}

		parent.classList.add(successClass);
	}

	const clonedHelper = {...formValidationHelper};

	clonedHelper[target.name] = isValid;

	setFormValidationHelper(clonedHelper);
}

export default checkRules;