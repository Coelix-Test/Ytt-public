import env from "../config/env"

export default {

    assignTeacher(studentId, teacherId){
        return env.API.post(`/admin/users/${studentId}/teacher`, {
            teacher: teacherId,
        });
    },

}