import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'

import HomePage from "./pages/HomePage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import JobPage, {jobLoader} from "./pages/JobPage.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";
import EditJobPage from "./pages/EditJobPage.jsx";

const App = () => {
    const addJob = async newJob => {
        await fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJob),
        })
    }

    const deleteJob = async id => {
        await fetch(`/api/jobs/${id}`, {
            method: 'DELETE',
        })
    }

    const updateJob = async job => {
        await fetch(`/api/jobs/${job.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(job),
        })
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='/jobs' element={<JobsPage/>}/>
                <Route path='/jobs/:id' element={<JobPage deleteJobSubmit={deleteJob}/>} loader={jobLoader}/>
                <Route path='/add-jobs' element={<AddJobPage addJobSubmit={addJob}/>}/>
                <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        )
    )

    return <RouterProvider router={router}/>
}

export default App
