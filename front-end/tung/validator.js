function Validator(object) {
    //  console.log(document.querySelector('#host_signup-form').querySelector(object.formMessage))
    var selectorRules = {};
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) return element.parentElement;
            element = element.parentElement;
        }
    }


    function validate(inputElement, rule) {
        var messageValidate;
        var rules = selectorRules[rule.selector];

        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'checkbox':
                case 'radio':
                    messageValidate = rules[i](formElement.querySelector(rule.selector + ':checked'));
                    break;
                default:
                    messageValidate = rules[i](inputElement.value);
            }
            if (messageValidate) break;
        }

        if (messageValidate) {
            getParent(inputElement, object.formGroupSelector).querySelector(object.formMessage).innerText = messageValidate;
        } else {
            getParent(inputElement, object.formGroupSelector).querySelector(object.formMessage).innerText = '';
        }
        if (getParent(inputElement, object.formGroupSelector).querySelector(object.formMessage).innerText) {
            getParent(inputElement, object.formGroupSelector).classList.add('invalid');
        } else {
            getParent(inputElement, object.formGroupSelector).classList.remove('invalid');
        }
        return !messageValidate;
    }

    var formElement = document.querySelector(object.form);
    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();
            var formValid = true;
            //validate khi click submit: lap qua rung rule va validate
            object.rules.forEach(function (rule) {
                var inputElement = document.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) formValid = false;
            });

            //submit form
            if (formValid) {
                if (typeof object.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formInputs = Array.from(enableInputs).reduce(function (values, input) {
                        switch (input.type) {
                            case 'checkbox':
                                if (!input.matches(':checked')) return values;
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;

                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});
                    object.onSubmit(formInputs);
                } else {
                    formElement.submit();
                }
            }
        }

        //tao list cac rule khi cac selector bi trung`
        object.rules.forEach(function (rule) {
            var inputElements = document.querySelectorAll(rule.selector)

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            Array.from(inputElements).forEach(function (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function () {
                    getParent(inputElement, object.formGroupSelector).querySelector(object.formMessage).innerText = '';
                    getParent(inputElement, object.formGroupSelector).classList.remove('invalid');
                }
            })


        });
    }

}

Validator.isRequired = function (selector, typeMess) {
    return {
        selector,
        test: function (value) {
            return value ? undefined : typeMess || 'Vui lòng nhập trường này!!!'
        }
    }
}
Validator.isEmail = function (selector, typeMess) {

    return {
        selector,
        test: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : typeMess || 'Trường này phải là email!!!'
        }
    }
}
Validator.minLen = function (selector, min, typeMess) {
    return {
        selector,
        test: function (value) {
            return value.length >= min ? undefined : typeMess || `Mật khẩu cần tối thiểu ${min} ký tự!!!`
        }
    }
}
Validator.isConfirm = function (selector, confirmValue, typeMess) {
    return {
        selector,
        test: function (value) {
            return value == confirmValue() ? undefined : typeMess || `Giá trị nhập vào không chính xác!!!`
        }
    }
}
// Validator.isChecked = function (selector, takeChecked, typeMess) {
//     return {
//         selector,
//         test: function () {
//             return takeChecked() ? undefined : typeMess || 'Trường này là bắt buộc!!!'
//         }
//     }
// }