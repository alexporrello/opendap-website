export class VersionData {
    fixVersion:String;
    newFeatures:NewFeature[];
    bugFixes:BugFixes[];
}

export class NewFeature {
    title:String;
    body:String;
}

export class BugFixes {
    url:String;
    key:String;
    text:String;
}