import { useState } from 'react'

function AccountDetails({ user }) {
    const [firstName, setFirstName] = useState(user?.firstName || '')
    const [lastName, setLastName] = useState(user?.lastName || '')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [addressTitle, setAddressTitle] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [phone, setPhone] = useState('')

    const handleSaveProfile = () => {}
    const handleSavePassword = () => {
        if (newPassword !== repeatPassword) { alert('Sifreler uygun gelmir'); return }
    }
    const handleSaveAddress = () => {}

    const inp = 'w-full border border-[#ccc] rounded px-3 py-2 text-[14px] outline-none focus:border-black transition'
    const lbl = 'block text-[14px] text-[#555] mb-1'
    const btn = 'w-full sm:w-auto bg-black text-white px-6 py-3 rounded text-[14px] font-medium cursor-pointer hover:bg-gray-800 transition'

    return (
        <div>
            <h2 className='text-[22px] sm:text-[26px] font-medium mb-6'>Account Details</h2>

            <div className='border-t border-[#e2e2e2] pt-6 pb-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                    <div><label className={lbl}>Firstname</label><input className={inp} value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
                    <div><label className={lbl}>Lastname</label><input className={inp} value={lastName} onChange={e => setLastName(e.target.value)} /></div>
                </div>
                <button onClick={handleSaveProfile} className={btn}>Save</button>
            </div>

            <div className='border-t border-[#e2e2e2] pt-6 pb-8'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>
                    <div><label className={lbl}>Current Password</label><input type='password' className={inp} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} /></div>
                    <div><label className={lbl}>New Password</label><input type='password' className={inp} value={newPassword} onChange={e => setNewPassword(e.target.value)} /></div>
                    <div><label className={lbl}>Repeat Password</label><input type='password' className={inp} value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} /></div>
                </div>
                <button onClick={handleSavePassword} className={btn}>Save New Password</button>
            </div>

            <div className='border-t border-[#e2e2e2] pt-6 pb-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                    <div><label className={lbl}>Address Title</label><input className={inp} value={addressTitle} onChange={e => setAddressTitle(e.target.value)} /></div>
                    <div><label className={lbl}>Postal Code</label><input className={inp} value={postalCode} onChange={e => setPostalCode(e.target.value)} /></div>
                    <div><label className={lbl}>Country</label>
                        <select className={inp} value={country} onChange={e => setCountry(e.target.value)}>
                            <option value=''></option>
                            <option value='AZ'>Azerbaijan</option>
                            <option value='TR'>Turkey</option>
                            <option value='US'>United States</option>
                        </select>
                    </div>
                    <div><label className={lbl}>City</label><input className={inp} value={city} onChange={e => setCity(e.target.value)} /></div>
                    <div><label className={lbl}>Street</label><input className={inp} value={street} onChange={e => setStreet(e.target.value)} /></div>
                    <div><label className={lbl}>Phone</label><input className={inp} value={phone} onChange={e => setPhone(e.target.value)} /></div>
                </div>
                <button onClick={handleSaveAddress} className={btn}>Save Address</button>
            </div>
        </div>
    )
}

export default AccountDetails