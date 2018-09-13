# Metadata Audit
DHIS2 Metadata Change Log and Monitoring app

# Introduction
Metadata Audit is an installable DHIS2 application that allows users to track the history of metadata objects on the system. The information made available via this application is made possible through accessing the `metadataAudit` Psql table.

# Dependencies
The following application requires, at the least, DHIS2 2.30.

Development was done on DHIS2 2.30, therefore, we recommend that your instance of DHIS2 be upgraded this version.

For this application to work, you MUST enable the metadata audit feature on your application instance. Refer [here](https://docs.dhis2.org/2.30/en/developer/html/webapi_metadata_audit.html) for instructions.
