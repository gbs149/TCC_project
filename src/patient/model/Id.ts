// Each resource has an id element which contains the "logical id" of the resource assigned
// by the server responsible for storing it. Resources always have a known logical id except
// for a few special cases (e.g. when a new resource is being sent to a server to assign a
// logical id in the create interaction). The logical id is unique within the space of all
// resources of the same type on the same server. Once assigned by the server, the id is never changed.

// TODO: validate => Ids can be up to 64 characters long, and contain any combination of upper
//  and lowercase ASCII letters, numerals, "-" and "."

// http://hl7.org/fhir/resource.html#id

export type Id = string;
