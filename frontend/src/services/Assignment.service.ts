import AuthService from "./Auth.service";

export default class AssignmentService{
 
    getPendingAssignments(){
        
        const authService = new AuthService();

        let user = authService.getCurrentUser();

        //TO-DO implement this List<AssignmentDto> pendingAssignmentsByUnit(String unitCode)
        
    }
}