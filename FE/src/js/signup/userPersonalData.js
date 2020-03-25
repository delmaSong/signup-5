import { VALID_CHECK_REGEX, STATE_MESSAGE, FORM_RULES } from '../constants/constant.js';
import { getElement } from '../util/commonUtil.js';
import { signupData } from '../data/signupData.js';

export function checkYear(year) {
    signupData.year = null;
    if (year.length !== FORM_RULES.YEAR_MAX_LENGTH) return STATE_MESSAGE.INVALID.BIRTH_DATE.YEAR;
    return checkBirthDate();
}

export function checkDay(day) {
    signupData.day = null;
    if (day.length < FORM_RULES.DAY_MIN_LENGTH || day.length > FORM_RULES.DAY_MAX_LENGTH) return STATE_MESSAGE.INVALID.BIRTH_DATE.DAY;
    return checkBirthDate();
}

export function checkBirthDate() {
    signupData.month = null;
    const inputYear = getElement('#birth-date-year').value;
    const inputMonth = getElement('#birth-date-month').value;
    const inputDay = getElement('#birth-date-day').value;
    const lastDay = new Date(inputYear, inputMonth, 0).getDate();

    if (!inputYear || !inputMonth || !inputDay) return STATE_MESSAGE.VALID.BASE;
    if (lastDay < inputDay) return STATE_MESSAGE.INVALID.BIRTH_DATE.BASE;
    if (!checkAge(inputYear, inputMonth, inputDay)) return STATE_MESSAGE.INVALID.BIRTH_DATE.AGE;
    signupData.year = inputYear;
    signupData.month = inputMonth;
    signupData.day = inputDay < FORM_RULES.NOT_DIGIT ? '0' + inputDay : inputDay;
    return STATE_MESSAGE.VALID.BASE;
}

function checkAge(year, month, day) {
    const age = calcAge(year, month, day < FORM_RULES.NOT_DIGIT ? '0' + day : day);
    if (age < FORM_RULES.AGE_MIN || age > FORM_RULES.AGE_MAX) return false;
    return true;
}

function calcAge(year, month, day) {
    const date = new Date();
    const curYear = date.getFullYear();
    let curMonth = (date.getMonth() + 1);
    let curDay = date.getDate();
    if (curMonth < FORM_RULES.NOT_DIGIT) curMonth = '0' + curMonth;
    if (curDay < FORM_RULES.NOT_DIGIT) curDay = '0' + curDay;
    const curMonthDay = curMonth + curDay;
    const inputYear = year;
    const inputMonthDay = month + day;
    const age = curMonthDay < inputMonthDay ? curYear - inputYear - 1 : curYear - inputYear;
    return age;
}

export function checkEmail(email) {
    signupData.email = null;
    const checkEmail = email.search(VALID_CHECK_REGEX.EMAIL);
    if (checkEmail) return STATE_MESSAGE.INVALID.EMAIL;
    signupData.email = email;
    return STATE_MESSAGE.VALID.BASE;
}

export function checkPhoneNumber(number) {
    signupData.phoneNumber = null;
    const checkNumber = number.search(VALID_CHECK_REGEX.PHONE_NUMBER);
    if (checkNumber) return STATE_MESSAGE.INVALID.PHONE_NUMBER;
    signupData.phoneNumber = number;
    return STATE_MESSAGE.VALID.BASE;
}

export function checkName(name) {
    signupData.name = null;
    if (name) signupData.name = name;
}

export function checkGender(gender) {
    signupData.sex = gender;
}