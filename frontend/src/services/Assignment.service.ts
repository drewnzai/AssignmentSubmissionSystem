import AuthService from "./Auth.service";

export default class AssignmentService{
 
    getPendingAssignments(){
        
        const authService = new AuthService();

        let user = authService.getCurrentUser();

        //TO-DO maybe store user units in current context

    }
}