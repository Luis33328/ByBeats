export class ConverterUtils {
    
    static convertDateFrontendToBackend(dateToConverter: String) {
        let splitDate = dateToConverter.split('/');
        return splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
    }

    static convertDateBackendToFrontend(dateToConverter: String) {
        if(dateToConverter === null || dateToConverter === '')
            return null;
        let splitTime = dateToConverter.split('T');
        let spliteDate = splitTime[0].split('-');
        return spliteDate[2] + '/' + spliteDate[1] + '/' + spliteDate[0];
    }

}