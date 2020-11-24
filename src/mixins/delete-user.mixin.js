import { mapActions, mapMutations } from "vuex";
import { STUDENT, TEACHER } from "@/constants/roles";

export default {
    data: () => ({
        userSelectedForDeletion: null,
    }),
    methods: {
        ...mapActions('Users', ['deleteUser']),
        ...mapMutations('Students', [ 'DELETE_STUDENT' ]),
        ...mapMutations('Teachers', [ 'DELETE_TEACHER' ]),
        deleteUserAlert(user){
            this.userSelectedForDeletion = user;
            this.$alert({
                title: 'Are you sure you want to delete user?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                onConfirm: this.onConfirmDeleteUser,
            });
        },
        onConfirmDeleteUser(){
            this.deleteUser({
                userId: this.userSelectedForDeletion.id,
            }).then(() => {
                if(this.userSelectedForDeletion.role_id === TEACHER){
                    this.DELETE_STUDENT({ studentId: this.userSelectedForDeletion.id });
                }
                else{
                    this.DELETE_TEACHER({ teacherId: this.userSelectedForDeletion.id });
                }
                this.userSelectedForDeletion = null;
                this.$notify({
                    title: 'User successfully deleted',
                    type: 'success'
                });
            }).catch(({ message }) => {
                this.userSelectedForDeletion = null;
                this.$notify({
                    title: "Error",
                    text: message,
                    type: 'error'
                });
            })
        }
    }
}