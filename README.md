# DHIS2 Metadata Change Log and Monitoring app

### Introduction
Metadata Change Log and Monitoring app is an installable DHIS2 application that allows users to track the history of metadata objects on the system. The information is made available via the DHIS2 MetadataAudit Web API.

### Prerequisite Action
The following application requires, at the least, DHIS2 version 2.30. This is because development was done & tested on this version.

For this application to work, you **must** enable the metadata audit feature on your application instance. Refer [here](https://docs.dhis2.org/2.30/en/developer/html/webapi_metadata_audit.html) for instructions. You only need to enable persisted audits, i.e. audits saved to the database. The specific Psql table where this information is stored is called `metadataAudit`.

## Development
The instructions assume that you are using a linux distribution.

### Requirements
In order to get started, you need to install [nodejs](https://nodejs.org/en/download/package-manager/) & [reactjs](https://reactjs.org/docs/create-a-new-react-app.html) on your machine. 

### Installation
1. Clone this repository.

```
git clone git@github.com:HI4KenyaBootcamp/dhis2-metadata-change-log-and-monitoring.git
```

2. Install all npm dependencies.

```
npm install
```

### Configuration
Before you start development, you'll need to update the **.env** file which is in the root directory.

Update the `REACT_APP_API` variable with the API URL of your DHIS2 version 2.30 instance.

### Running the Application
Once you have setup the requirements, installed the application, it's dependencies and configured it, fire up the application by running the following command in your terminal.

```
npm start
```

That's it! You're good to go!!

## Credits
The following application has heavily relied on the following open source projects: 

1. [Material UI](https://material-ui.com/)
2. [React Router](https://reacttraining.com/react-router/)
3. [Moment.js](https://momentjs.com/)