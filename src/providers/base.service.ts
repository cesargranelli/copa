import { Observable } from 'rxjs';

const extractError = (error: Response | any): string => {
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);

    return errMsg;
}

export abstract class BaseProvider {

    protected api = 'https://api-futecopa.herokuapp.com';
    //protected api = 'http://localhost:5000';

    protected handlePromiseError(error: Response | any): Promise<any> {
        return Promise.reject(extractError(error));
    }

    protected handleObservableError(error: Response | any): Observable<any> {
        return Observable.throw(extractError(error));
    }

}
