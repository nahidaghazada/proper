import { useState } from 'react'
import toast from 'react-hot-toast'
import { useUpdateProfileMutation, useChangePasswordMutation } from '../../services/authApi'

function AccountDetails({ user }) {
    const [firstName, setFirstName] = useState(user?.firstName || '')
    const [lastName, setLastName] = useState(user?.lastName || '')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [loadingPassword, setLoadingPassword] = useState(false)
    const [updateProfile] = useUpdateProfileMutation()
    const [changePassword] = useChangePasswordMutation()
    const inp = 'w-full border border-[#ccc] rounded px-3 py-2 text-[14px] outline-none focus:border-black transition'
    const lbl = 'block text-[14px] text-[#555] mb-1'

    const handleSaveProfile = async () => {
        setLoadingProfile(true)
        try {
            await updateProfile({ firstName, lastName }).unwrap()
            toast.success('Profile updated successfully')
            setFirstName('')
            setLastName('')
        } catch {
            toast.error('Something went wrong')
        } finally {
            setLoadingProfile(false)
        }
    }

    const handleSavePassword = async () => {
        if (!currentPassword || !newPassword || !repeatPassword) {
            toast.error('Please fill in all fields')
            return
        }
        if (newPassword !== repeatPassword) {
            toast.error('Passwords do not match')
            return
        }
        setLoadingPassword(true)
        try {
            await changePassword({ currentPassword, newPassword, repeatPassword }).unwrap()
            toast.success('Password updated successfully')
            setCurrentPassword('')
            setNewPassword('')
            setRepeatPassword('')
        } catch (err) {
            toast.error(err?.data?.message || 'Something went wrong')
        } finally {
            setLoadingPassword(false)
        }
    }

    const Btn = ({ loading, onClick, label }) => (
        <button
            onClick={onClick}
            disabled={loading}
            className='w-full sm:w-auto bg-black text-white px-6 py-3 rounded text-[14px] font-medium cursor-pointer hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2'>
            {loading && (
                <svg className='animate-spin h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                </svg>
            )}
            {loading ? 'Saving...' : label}
        </button>
    )

    return (
        <div>
            <h2 className='text-[22px] sm:text-[26px] font-medium mb-6'>Account Details</h2>

            <div className='border-t border-[#e2e2e2] pt-6 pb-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                    <div><label className={lbl}>Firstname</label><input className={inp} value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
                    <div><label className={lbl}>Lastname</label><input className={inp} value={lastName} onChange={e => setLastName(e.target.value)} /></div>
                </div>
                <Btn loading={loadingProfile} onClick={handleSaveProfile} label='Save' />
            </div>

            <div className='border-t border-[#e2e2e2] pt-6 pb-8'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>
                    <div><label className={lbl}>Current Password</label><input type='password' className={inp} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} /></div>
                    <div><label className={lbl}>New Password</label><input type='password' className={inp} value={newPassword} onChange={e => setNewPassword(e.target.value)} /></div>
                    <div><label className={lbl}>Repeat Password</label><input type='password' className={inp} value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} /></div>
                </div>
                <Btn loading={loadingPassword} onClick={handleSavePassword} label='Save New Password' />
            </div>
        </div>
    )
}

export default AccountDetails