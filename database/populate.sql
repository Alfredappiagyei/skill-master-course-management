--the code below inserts some sample data for testing purposes
-- directly from the backend database


-- INSERT INTO EMPLOYEE TABLE
begin
    insert into Employee(employeeFName,employeeLName,employeeEmail,employeeContact)
    values('Angel','Morgan','am@gmail.com','11111');

    insert into Employee(employeeFName,employeeLName,employeeEmail,employeeContact)
    values('Solomon','Dankyi','sd@gmail.com','12355');

    insert into Employee(employeeFName,employeeLName,employeeEmail,employeeContact)
    values('Stephen','Danso','ds@gmail.com','11122');

    insert into Employee(employeeFName,employeeLName,employeeEmail,employeeContact)
    values('David','Bawsineku','db@gmail.com','11111');

    insert into Employee(employeeFName,employeeLName,employeeEmail,employeeContact)
    values('Alfred','Appiagyei','aa@gmail.com','66666');

    insert into Employee(employeeFName,employeeLName,employeeEmail,employeeContact)
    values('Diana','Kent','dk@gmail.com','12121');

    insert into Employee(employeeFName,employeeLName,employeeEmail,employeeContact)
    values('Mirabel','Hailey','mh@gmail.com','24242');

    insert into Employee(employeeFName,employeeLName,employeeEmail,employeeContact)
    values('Angela','Daniels','ad@gmail.com','33333');
end;
/

-- INSERT INTO CLIENT TABLE
begin
    insert into Client(clientName,clientEmail,clientContact)
    values('Movenpick','m11@g.com','123');

    insert into Client(clientName,clientEmail,clientContact)
    values('UG','ug@g.com','111');

    insert into Client(clientName,clientEmail,clientContact)
    values('Hedge','hpt@g.com','222');

    insert into Client(clientName,clientEmail,clientContact)
    values('Obidi','obd@g.com','666');
end;
/

--INSERT INTO DELEGATE TABLE
begin
insert into Delegate(
    delegateTitle,
    delegateFName,
    delegateLName,
    delegateStreet,
    delegateCity,
    delegateState,
    delegateZipCode,
    attTelNo,
    attFaxNo,
    attEmailAddress,
    clientNo)
values(
    'Mr',
    'Hansel',
    'Edgar',
    '123 St Patrick',
    'Accra',
    'Delta State',
    '233',
    '12345',
    '11111',
    'hanE@gmail.com',
    1
);
insert into Delegate(
    delegateTitle,
    delegateFName,
    delegateLName,
    delegateStreet,
    delegateCity,
    delegateState,
    delegateZipCode,
    attTelNo,
    attFaxNo,
    attEmailAddress,
    clientNo)
values(
    'MrS',
    'Gretel',
    'Greene',
    'Elfs Street',
    'Accra',
    'Alpha State',
    '233',
    '22221',
    '23412',
    'gg@gmail.com',
    2
);
insert into Delegate(
    delegateTitle,
    delegateFName,
    delegateLName,
    delegateStreet,
    delegateCity,
    delegateState,
    delegateZipCode,
    attTelNo,
    attFaxNo,
    attEmailAddress,
    clientNo)
values(
    'Mr',
    'Patrick',
    'Saint',
    '1 Boulevard Rd',
    'Cape',
    'Cape Town',
    '234',
    '34512',
    '15611',
    'mps@gmail.com',
    2
);
end;
/

--INSERT INTO COURSETYPE TABLE
begin
    insert into CourseType(courseTypeDescription)
    values('FrontEnd Development');

    insert into CourseType(courseTypeDescription)
    values('BackEnd Development');

    insert into CourseType(courseTypeDescription)
    values('UI/UX Development');

    insert into CourseType(courseTypeDescription)
    values('DataScience');

    insert into CourseType(courseTypeDescription)
    values('Machine Learning');

    insert into CourseType(courseTypeDescription)
    values('Artificial Intelligence');

    insert into CourseType(courseTypeDescription)
    values('DataBase');
end;
/

--INSERT INTO COURSE TABLE
begin
    insert into Course(
        courseName,
        courseDescription,
        startDate,
        endDate,
        startTime,
        endTime,
        maxDelegates,
        confirmed,
        delivererEmployeeNo,
        courseTypeNo)
    values(
        'DataBase Fundamentals',
        'Introductcion to basic Database and SQL',
        date '2024-06-01',
        date '2024-08-31',
        timestamp  '2024-06-01 07:30:00',
        timestamp '2024-08-31 09:30:00',
        50,
        'Y',
        4,
        7
    );
    insert into Course(
        courseName,
        courseDescription,
        startDate,
        endDate,
        startTime,
        endTime,
        maxDelegates,
        confirmed,
        delivererEmployeeNo,
        courseTypeNo)
    values(
        'Advanced DataBase',
        'In depth Training for advanced Users',
        date '2024-06-01',
        date '2024-08-31',
        timestamp '2024-06-01 10:30:00',
        timestamp '2024-08-31 12:30:00',
        50,
        'Y',
        4,
        7
    );
end;
/

--INSERT INTO COURSEFEE TABLE
begin
    insert into CourseFee(feeDescription,fee,courseNo)
    values('Standard Fee', 1000, 1);
    insert into CourseFee(feeDescription,fee,courseNo)
    values('Discounted Fee', 750, 1);

    insert into CourseFee(feeDescription,fee,courseNo)
    values('Standard Fee', 1200, 2);
    insert into CourseFee(feeDescription,fee,courseNo)
    values('Discounted Fee', 900, 2);
end;
/

--INSERT INTO PAYMENTMETHOD TABLE
begin
    insert into PaymentMethod(pMethodName)
    values('Physical-Cash');

    insert into PaymentMethod(pMethodName)
    values('E-Cash');
end;
/

--INSERT INTO LOCATION TABLE
begin
    insert into Location(locationName,locationMaxSize)
    values('JQB 01', 20);
    
    insert into Location(locationName,locationMaxSize)
    values('NNB 01', 25);

    insert into Location(locationName,locationMaxSize)
    values('NNB 02', 25);

    insert into Location(locationName,locationMaxSize)
    values('NNB 03', 15);

    insert into Location(locationName,locationMaxSize)
    values('JQB 19', 10);

    insert into Location(locationName,locationMaxSize)
    values('JQB 22', 15);

    insert into Location(locationName,locationMaxSize)
    values('CC', 50);

    insert into Location(locationName,locationMaxSize)
    values('KAB', 5);
end;
/

--INSERT INTO REGISTRATION TABLE
begin
    insert into Registration(registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo)
    values(date'2024-06-25', 3, 1, 5, 1);

    insert into Registration(registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo)
    values(date'2024-06-25', 3, 2, 3, 2);

    insert into Registration(registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo)
    values(date'2024-06-25', 2, 2, 5, 1);

    insert into Registration(registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo)
    values(date'2024-06-25', 1, 2,4, 1);

    insert into Registration(registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo)
    values(date'2024-06-25', 3, 1, 3, 1);
end;
/

--INSERTING INTO INVOICE TABLE
begin
    insert into Invoice(dateRaised,datePaid,creditCardNo,holdersName,expiryDate,registrationNo,pMethodNo)
    values(date'2024-05-20',date'2024-05-20',123456789,'Encarta',date'2026-12-12',4,2);

    insert into Invoice(dateRaised,datePaid,creditCardNo,holdersName,expiryDate,registrationNo,pMethodNo)
    values(date'2024-05-20',date'2024-05-20',123456789,'Encarta',date'2026-12-12',5,2);

    insert into Invoice(dateRaised,datePaid,creditCardNo,holdersName,expiryDate,registrationNo,pMethodNo)
    values(date'2024-05-20',date'2024-05-20',123456789,'Encarta',date'2026-12-12',2,2);

    insert into Invoice(dateRaised,datePaid,creditCardNo,holdersName,expiryDate,registrationNo,pMethodNo)
    values(date'2024-05-20',date'2024-05-20',null,null,null,2,1);
end;
/

-- INSERTING INTO BOOKING TABLE
begin
    insert into Booking(bookingDate,locationNo,courseNo,bookingEmployeeNo)
    values(date'2024-05-21',7,1,7);

    insert into Booking(bookingDate,locationNo,courseNo,bookingEmployeeNo)
    values(date'2024-05-23',5,1,7);

    insert into Booking(bookingDate,locationNo,courseNo,bookingEmployeeNo)
    values(date'2024-01-01',4,2,4);

    insert into Booking(bookingDate,locationNo,courseNo,bookingEmployeeNo)
    values(date'2024-06-27',5,2,4);
end;
/












