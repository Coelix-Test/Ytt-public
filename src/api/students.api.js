import axios from 'axios';

export default {

    assignTeacher(studentId, teacherId){
        return axios.post(`/admin/users/${studentId}/teacher`, {
            teacher: teacherId,
        });
    },

}
