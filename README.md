# DHIS2 Metadata Change Log and Monitoring app

### Introduction
Metadata Audit is an installable DHIS2 application that allows users to track the history of metadata objects on the system. The information made available via this application is made possible through accessing the `metadataAudit` Psql table, via the the DHIS2 Web API.

### Prerequisite Action
The following application requires, at the least, DHIS2 2.30. This is because development was done & tested on this version, therefore, we recommend that your instance of DHIS2 be upgraded.

For this application to work, you **must** enable the metadata audit feature on your application instance. Refer [here](https://docs.dhis2.org/2.30/en/developer/html/webapi_metadata_audit.html) for instructions. You only need to enable persisted audits that are saved to the database.

## Development
New contributions to this project are welcome!

### Requirements
In order to get started, you need to install [nodejs](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) & [reactjs](https://reactjs.org/docs/create-a-new-react-app.html) on you machine. The linked instructions assume you are using a linux distribution.

### Installation
1. Clone this repository. Open your terminal, paste the command below and press enter to run it.

```
git clone git@github.com:HI4KenyaBootcamp/dhis2-metadata-change-log-and-monitoring.git
```

2. Install all npm dependencies. Paste the command below and press enter to run it.

```
npm install
```

### Configuration
Before you start development, you'll need to update the **.env** file which is on the root directory. Update the `REACT_APP_DOMAIN` variable with the URL of you DHIS2 instance.

### Running the Application
Once you have setup the requirements, installed the application & it's dependencies, and configured the application to your local DHIS2 instance, you can fire up the application by running the following command in your terminal. Paste the command and press enter to run it.

```
npm start
```

## Credits
The following application has heavily relied on the following open source projects: 

1. [Material UI](https://material-ui.com/)
2. [React Router](https://reacttraining.com/react-router/)
3. [Moment.js] (https://momentjs.com/)