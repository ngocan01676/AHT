const forms = {
    email(value) {
        const re = /^.+@.+\..+/;
        return re.test(value);
    },

    phone(value) {
        const re = /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;
        return re.test(value);
    },
    /**
     * Validates a password field
     * @param value
     * @returns {boolean}
     */
    password(value) {
        return this.notEmpty(value);
    },
    onlySpace(value) {
        return /\S/.test(value);
    },
    /**
     * validates if a field is empty
     * @param value
     * @returns {boolean}
     *
     */
    notEmpty(value) {
        return value.length > 0;
    },
};

export default forms;
