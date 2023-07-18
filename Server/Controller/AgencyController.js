import PackageModel from "../Model/packageModel.js";
import PlanModel from "../Model/PlanModal.js"
import BookingModel from "../Model/BookingModel.js"
import PlanBookingModel from "../Model/PlanBookModel.js"
import { count } from "console";
export async function addPackage(req, res) {
    try {
        console.log(req.body);
        const { dayDetails, agencyId, ...otherData } = req.body;
        const parsedDayDetails = JSON.parse(dayDetails);
        const mainImage = req.files.mainImage;
        const subImages = req.files.subImages;
        let coordinates = JSON.parse(req.body['location.coordinates'])
        const packageData = { ...otherData, agencyId, mainImage, subImages, dayDetails: parsedDayDetails, location: { type: "Point", coordinates: [coordinates[0], coordinates[1]] } };
        const packages = await PackageModel.create(packageData);
        res.json({ err: false, message: 'Package added successfully' });
    } catch (error) {
        console.error(error);
        res.json({ err: true, message: 'Error adding package' });
    }
}

export async function editPackage(req, res) {

    console.log('REQ', req.body);
    console.log(req.files)
}
export async function addPlan(req, res) {
    console.log(req.body);
    let mainImage = req.files.mainImage
    let subImages = req.files.subImages
    let eventDetails = req.body.programmeDetails
    let parsedEventDetails = JSON.parse(eventDetails)
    let Plan = await PlanModel.create({ ...req.body, mainImage, subImages, ProgrammeDetails: parsedEventDetails })
    res.json({ err: false, message: "plan added succesfully" })
}

export async function getPackages(req, res) {
    let packages = await PackageModel.find().lean()
    res.json({ err: false, packages })
}
export async function getPlans(req, res) {
    let plans = await PlanModel.find().lean()
    res.json({ err: false, plans })
}
export async function acitvatePackage(req, res) {
    let _id = req.body.id``
    let activate = await PackageModel.findByIdAndUpdate(_id, { active: true })
    res.json({ err: false, message: "activated" })
}
export async function deacitvatePackage(req, res) {
    let _id = req.body.id
    let activate = await PackageModel.findByIdAndUpdate(_id, { active: false })
    res.json({ err: false, message: "activated" })
}
export async function acitvatePlan(req, res) {
    let _id = req.body.id
    console.log(_id);
    let activate = await PlanModel.findByIdAndUpdate(_id, { active: true })
    res.json({ err: false, message: "activated" })
}
export async function deacitvatePlan(req, res) {
    let _id = req.body.id
    let activate = await PlanModel.findByIdAndUpdate(_id, { active: false })
    res.json({ err: false, message: "activated" })
}
export async function deletePackage(req, res) {
    let _id = req.body.id
    await PackageModel.findByIdAndDelete({ _id })
    res.json({ err: false, message: "deleted" })
}
export async function deletePlan(req, res) {
    let _id = req.body.id
    await PlanModel.findByIdAndDelete({ _id })
    res.json({ err: false, message: "deleted" })
}
export async function getBookings(req, res) {
    try {
        const PlanBookings = await PlanBookingModel.find().populate("PlanId").populate("userId")
        const bookings = await BookingModel.find().populate("PackageId").populate("userId")

        console.log(PlanBookings);
        res.json({ err: false, bookings, PlanBookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: true, message: "Failed to fetch bookings" });
    }
}

export async function getDashboardBookings(req, res) {
    try {
        const currentDate = new Date();
        const completedTripsCount = await BookingModel.aggregate([
            {
                $match: {
                    status: "upcoming",
                },
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "PackageId",
                    foreignField: "_id",
                    as: "packages",
                },
            },
            {
                $match: {
                    "packages.endDate": { $lt: currentDate },
                },
            },
            {
                $count: "count",
            },
        ]).exec();
        const completedPlansCount = await PlanBookingModel.aggregate([
            {
                $match: {
                    status: "upcoming",
                },
            },
            {
                $lookup: {
                    from: "plans",
                    localField: "PlanId",
                    foreignField: "_id",
                    as: "plan",
                },
            },
            {
                $match: {
                    "plan.date": { $lt: currentDate },
                },
            },
            {
                $count: "count",
            },
        ]).exec();



        let pendingPlanCount = await PlanBookingModel.aggregate([
            {
                $match: {
                    status: "upcoming"
                }
            },
            {
                $lookup: {
                    from: "plans",
                    localField: "PlanId",
                    foreignField: "_id",
                    as: "plan"
                }
            },
            {
                $match: {
                    "plan.date": { $gt: currentDate }
                }
            },
            {
                $count: "count"
            }
        ])
        let pendingTripsCount = await BookingModel.aggregate([
            {
                $match: {
                    status: "upcoming"
                }
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "PackageId",
                    foreignField: "_id",
                    as: "packages"
                }
            },
            {
                $match: {
                    "packages.startDate": { $gt: currentDate }
                }
            },
            {
                $count: "count"
            }
        ])

        let BookedPackagesAmountDocuments = await BookingModel.find({ status: "upcoming" }).select("totalCost").exec()
        let PackageBookedAmount = 0
        BookedPackagesAmountDocuments.forEach(item => {
            PackageBookedAmount += item.totalCost

        })
        let BookedPlanAmountDoc = await PlanBookingModel.find({ status: "upcoming" }).select("totalCost").exec()
        let PlanBookedAmount = 0
        BookedPlanAmountDoc.forEach(item => {
            PlanBookedAmount += item.totalCost
        })

        let totalTripCount = await BookingModel.countDocuments()
        let totalPlanCount = await PlanBookingModel.countDocuments()

        const tripsMonthlyData = await BookingModel.aggregate([
            {
                $match: {
                    status: "upcoming",
                },
            },
            {
                $group: {
                    _id: {
                        $month: "$createdAt",
                    },
                    count: {
                        $sum: 1,
                    },
                    totalCost: {
                        $sum: "$totalCost",
                    },
                },
            },
        ]).exec();

        const PlanMonthlyData = await PlanBookingModel.aggregate([
            {
                $match: {
                    status: "upcoming"
                }
            }, {
                $group: {
                    _id: {
                        $month: "$createdAt"
                    }, count: {
                        $sum: 1
                    }, totalCost: {
                        $sum: "$totalCost"
                    }
                }
            }]
        )
   
        const monthlyData = [];

        for (const tripData of tripsMonthlyData) {
          const matchingPlanData = PlanMonthlyData.find(
            (planData) => planData._id === tripData._id
          );
        
          if (matchingPlanData) {
            monthlyData.push({
              _id: tripData._id,
              count: tripData.count + matchingPlanData.count,
              totalCost: tripData.totalCost + matchingPlanData.totalCost,
            });
        
            // Remove the matched plan data from PlanMonthlyData
            const planIndex = PlanMonthlyData.indexOf(matchingPlanData);
            PlanMonthlyData.splice(planIndex, 1);
          } else {
            monthlyData.push(tripData);
          }
        }
        
        // Append the remaining unmatched plan data from PlanMonthlyData
        monthlyData.push(...PlanMonthlyData);
        
        console.log("month",monthlyData);

        res.json({
            err: false, completedTripsCount, PackageBookedAmount,
            pendingTripsCount, totalTripCount, totalPlanCount,
            completedPlansCount, pendingPlanCount, PlanBookedAmount,monthlyData
        });
    } catch (error) {
        console.error("Error:", error);
        res.json({ err: "Internal Server Error" });
    }
}