FROM fhirbase/fhirbase:latest
WORKDIR fhirbase
USER postgres
RUN psql -U postgres -c 'create database fhirbase;' && \
        fhirbase -d fhirbase --fhir=4.0.0 init
