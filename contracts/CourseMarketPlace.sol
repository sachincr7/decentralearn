// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketPlace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint256 id;
        uint256 price;
        bytes32 proof;
        address owner;
        State state;
    }

    // owner of the contract
    address payable private owner;

    // no of all courses + id of the course
    uint256 private totalOwnedCourses;

    /// Course already has a owner
    error CourseHasOwner();

    // mapping of course hash to course data
    mapping(bytes32 => Course) private ownedCourses;

    // mapping of courseId to courseHash
    mapping(uint256 => bytes32) private ownedCourseHash;

    // only the owner has the access
    error OnlyOwner();

    // Course is not created
    error CourseIsNotCreated();

    // course has invalid state
    error InvalidState();

    // check if its the current owner
    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    constructor() {
        setContractOwner(msg.sender);
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

        if (hasCourseOwnership(courseHash)) {
            revert CourseHasOwner();
        }

        uint256 id = totalOwnedCourses++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function hasCourseOwnership(bytes32 courseHash)
        private
        view
        returns (bool)
    {
        return ownedCourses[courseHash].owner == msg.sender;
    }

    function isCourseCreated(bytes32 courseHash) private view returns (bool) {
        return
            ownedCourses[courseHash].owner !=
            0x0000000000000000000000000000000000000000;
    }

    function getCourseCount() external view returns (uint256) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint256 index)
        external
        view
        returns (bytes32)
    {
        return ownedCourseHash[index];
    }

    function getCourseByHash(bytes32 courseHash)
        external
        view
        returns (Course memory)
    {
        return ownedCourses[courseHash];
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    // Activate Course ///
    function activateCourse(bytes32 courseHash) external onlyOwner {
        if (!isCourseCreated(courseHash)) {
            revert CourseIsNotCreated();
        }

        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Purchased) {
            revert InvalidState();
        }

        course.state = State.Activated;
    }

    // Deactivate Course
    function deactivateCourse(bytes32 courseHash) external onlyOwner {
        if (!isCourseCreated(courseHash)) {
            revert CourseIsNotCreated();
        }

        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Purchased) {
            revert InvalidState();
        }

        (bool success, ) = course.owner.call{value: course.price}("");
        require(success, "Transfer failed");

        course.state = State.Deactivated;
        course.price = 0;
    }
}
